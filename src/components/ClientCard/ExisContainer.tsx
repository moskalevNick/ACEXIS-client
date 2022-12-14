import styles from './ClientCard.module.css';
import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal/Modal';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { AddExisIcon } from '../Icons/AddExisIcon';
import { CrossIcon } from '../Icons/CrossIcon';
import { PinnedIcon } from '../Icons/PinnedIcon';
import { EditIcon } from '../Icons/EditIcon';
import { CrossInSquareIcon } from '../Icons/CrossInSquareIcon';
import { SquareTickIcon } from '../Icons/SquareTickIcon';
import { ExisType } from '../../types';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { exisActions } from '../../redux/exis/actions';
import { visitActions } from '../../redux/visit/actions';
import { t } from 'i18next';
import { dayAgo } from '../../helpers/constants';

type ExisContainerType = {
  clientId?: string;
};

export const ExisContainer: React.FC<ExisContainerType> = ({ clientId }) => {
  const dispatch = useAppDispatch();
  const [exises, setExises] = useState<ExisType[]>([]);
  const [pinnedExis, setPinnedExis] = useState<ExisType>();
  const [editingExis, setEditingExis] = useState<ExisType>();
  const [editingExisStr, setEditingExisStr] = useState<string>('');
  const [isOpenDeleteExis, setOpenDeleteExis] = useState(false);
  const [deletingExis, setDeletingExis] = useState<ExisType | undefined>();
  const [newExisText, setNewExisText] = useState<string>('');

  let storeExises = useAppSelector((state) => state.exisReducer.exises);
  let storePinnedExises = useAppSelector((state) => state.exisReducer.pinnedExis);
  let newClient = useAppSelector((state) => state.clientReducer.currentClient);

  useEffect(() => {
    if (clientId || newClient) {
      setExises(
        [...storeExises].sort((a, b) => -Number(new Date(a.date)) + Number(new Date(b.date))),
      );
    } else setExises([]);
  }, [storeExises, clientId, newClient]);

  useEffect(() => {
    if (storePinnedExises) {
      if (Object.keys(storePinnedExises).length !== 0 && clientId) {
        setPinnedExis(storePinnedExises[clientId]);
      } else setPinnedExis(undefined);
    } else setPinnedExis(undefined);
  }, [storePinnedExises, clientId]);

  useEffect(() => {
    if (clientId) {
      dispatch(exisActions.getExises(clientId));
      dispatch(visitActions.getVisits(clientId));
    }
  }, [clientId, dispatch]);

  useEffect(() => {
    editingExis ? setEditingExisStr(editingExis?.text) : setEditingExisStr('');
  }, [editingExis]);

  const confirmDeleteExis = (exis?: ExisType) => {
    setOpenDeleteExis(true);
    setDeletingExis(exis);
  };

  const deleteExis = () => {
    deletingExis && dispatch(exisActions.deleteExis(deletingExis.id));
    setOpenDeleteExis(false);
    setDeletingExis(undefined);
  };

  const editExis = (exis?: ExisType) => {
    editingExis ? setEditingExis(undefined) : setEditingExis(exis);
  };

  const redactExis = () => {
    if (editingExisStr && editingExis?.id) {
      dispatch(exisActions.editExis({ id: editingExis.id, text: editingExisStr }));
    }

    setEditingExis(undefined);
  };

  const addNewExis = () => {
    dispatch(
      exisActions.createExis({
        clientId: clientId ? clientId : newClient?.id || '',
        date: new Date(),
        text: newExisText,
      }),
    );
    setNewExisText('');
  };

  const pinExis = (exis: ExisType) => {
    unpinExis();
    dispatch(exisActions.editExis({ id: exis.id, isPinned: true }));
  };

  const unpinExis = () => {
    if (pinnedExis) {
      dispatch(exisActions.editExis({ id: pinnedExis.id, isPinned: false }));
    }
  };

  const exisWrapperClassnames = classNames(
    styles.exisesWrapper,
    pinnedExis && styles.exisesWrapperWithPin,
  );
  const exisInputWrapperClassnames = classNames(
    styles.exisInputWrapper,
    editingExis && styles.exisEditInputWrapper,
  );

  return (
    <div className={styles.exisBackground}>
      <div className={styles.exisContainer}>
        {exises?.length ? (
          <>
            {pinnedExis && (
              <div className={styles.pinnedExisWrapper}>
                <div className={styles.pinnedMessageDateWrapper}>
                  <div className={styles.pinIconWrapper}>
                    <PinnedIcon />
                  </div>
                  <div className={styles.pinnedMessageDate}>
                    {new Date(pinnedExis.date).toLocaleDateString()}{' '}
                    {new Date(pinnedExis.date).toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                <button className={styles.unpinButton} onClick={unpinExis}>
                  <PinnedIcon stroke="#fff" />
                  <div className={styles.labelUnpinButton}>{t('unpin_this_exis')}</div>
                </button>

                <div className={styles.pinnedMessageText}>{pinnedExis.text}</div>
              </div>
            )}
            <div className={exisWrapperClassnames}>
              {exises.map((exis) => (
                <div className={styles.exisContentWrapper} key={exis.id}>
                  <div className={styles.messageDateWrapper}>
                    <div className={styles.messageDate}>
                      {new Date(exis.date).toLocaleDateString()}{' '}
                      {new Date(exis.date).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                    <div className={styles.buttonsWrapper}>
                      <button onClick={() => pinExis(exis)}>
                        <PinnedIcon />
                      </button>
                      {new Date(exis.date) > dayAgo && (
                        <button onClick={() => editExis(exis)}>
                          <EditIcon />
                        </button>
                      )}
                      <button onClick={() => confirmDeleteExis(exis)}>
                        <CrossInSquareIcon />
                      </button>
                    </div>
                  </div>
                  <div className={styles.messageText}>{exis.text}</div>
                  <Modal
                    onClose={() => setOpenDeleteExis(false)}
                    open={isOpenDeleteExis}
                    className={styles.modalDeleteExis}
                    label={t('delete_exis') as string}
                  >
                    <div className={styles.contentWrapperDeleteClientModal}>
                      <div className={styles.contentDeleteModal}>
                        {t('are_you_sure_you_want_to_delete_this_exis')}
                      </div>
                      <div className={styles.deleteExisWrapper}>
                        <div className={styles.deleteExisDate}>
                          {deletingExis && new Date(deletingExis.date).toLocaleDateString()}{' '}
                          {deletingExis &&
                            new Date(deletingExis.date).toLocaleTimeString('en-GB', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                        </div>
                        <div className={styles.deleteExisText}>{deletingExis?.text}</div>
                      </div>
                      <div className={styles.buttonWrapper}>
                        <Button
                          className={styles.cancelButton}
                          outlined
                          onClick={() => setOpenDeleteExis(false)}
                        >
                          {t('cancel')}
                        </Button>
                        <Button className={styles.logoutButton} onClick={deleteExis}>
                          {t('delete')}
                        </Button>
                      </div>
                    </div>
                  </Modal>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.noExis}>{t('no_exis')}</div>
        )}
        <div className={exisInputWrapperClassnames}>
          <div className={styles.horizontalLine} />
          {editingExis ? (
            <div className={styles.wrapperEdittingInpt}>
              <div className={styles.labelEdittingInput}>
                <EditIcon />
                {t('editing')}
              </div>
              <div className={styles.editingExisText}>{editingExis.text}</div>
              <Input
                className={styles.exisEditInput}
                value={editingExisStr}
                onChange={(e) => setEditingExisStr(e.target.value)}
                autoFocus
              />
              <Button
                className={styles.exisSubmitEditButton}
                beforeIcon={<SquareTickIcon />}
                onClick={redactExis}
              />
              <button onClick={() => setEditingExis(undefined)} className={styles.buttonCloseEdit}>
                <CrossIcon />
              </button>
            </div>
          ) : (
            <>
              <Input
                className={styles.exisInput}
                placeholder={t('enter_exis') as string}
                value={newExisText}
                onChange={(e) => setNewExisText(e.target.value)}
              />
              <Button
                className={styles.exisSubmitButton}
                beforeIcon={<AddExisIcon />}
                onClick={addNewExis}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
