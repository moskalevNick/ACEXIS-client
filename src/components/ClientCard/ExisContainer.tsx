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
import { ExisType } from '../../redux/types';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { exisActions } from '../../redux/exis/actions';

type ExisContainerType = {
  clientId?: string;
};

export const ExisContainer: React.FC<ExisContainerType> = ({ clientId }) => {
  const dispatch = useAppDispatch();
  const [exises, setExises] = useState<ExisType[]>([]);
  const [pinnedMessage, setPinnedMessage] = useState<ExisType>();
  const [editingExis, setEditingExis] = useState<ExisType>();
  const [editingExisStr, setEditingExisStr] = useState<string>('');
  const [isOpenDeleteExis, setOpenDeleteExis] = useState(false);
  const [deletingExis, setDeletingExis] = useState<ExisType | undefined>();
  const [newExisText, setNewExisText] = useState<string>('');

  let storeExises = useAppSelector((state) => state.exisReducer.exises);

  useEffect(() => {
    if (clientId) {
      setExises(
        [...storeExises].sort((a, b) => -Number(new Date(a.date)) + Number(new Date(b.date))),
      );
    } else setExises([]);
  }, [storeExises]);

  useEffect(() => {
    if (clientId) {
      dispatch(exisActions.getExises(clientId));
    }
  }, [clientId]);

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
    if (clientId) {
      dispatch(
        exisActions.createExis({
          clientId: clientId,
          date: new Date(),
          text: newExisText,
        }),
      );
    }
    setNewExisText('');
  };

  const exisWrapperClassnames = classNames(
    styles.exisesWrapper,
    // pinnedMessage && styles.exisesWrapperWithPin,
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
            {/* {pinnedMessage && (
              <div className={styles.pinnedExisWrapper}>
                <div className={styles.pinnedMessageDateWrapper}>
                  <div className={styles.pinIconWrapper}>
                    <PinnedIcon />
                  </div>
                  <div className={styles.pinnedMessageDate}>
                    {new Date(pinnedMessage.date).toLocaleDateString()}
                  </div>
                </div>
                <button className={styles.unpinButton} onClick={() => console.log('pinExis()')}>
                  <PinnedIcon stroke="#fff" />
                  <div className={styles.labelUnpinButton}>Unpin this EXIS</div>
                </button>

                <div className={styles.pinnedMessageText}>{pinnedMessage.text}</div>
              </div>
            )} */}
            <div className={exisWrapperClassnames}>
              {exises.map((exis) => (
                <div className={styles.exisContentWrapper} key={exis.id}>
                  <div className={styles.messageDateWrapper}>
                    <div className={styles.messageDate}>
                      {new Date(exis.date).toLocaleDateString()}
                    </div>
                    <div className={styles.buttonsWrapper}>
                      <button onClick={() => console.log('pinExis')}>
                        <PinnedIcon />
                      </button>
                      <button onClick={() => editExis(exis)}>
                        <EditIcon />
                      </button>
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
                    label="Delete EXIS"
                  >
                    <div className={styles.contentWrapperDeleteClientModal}>
                      <div className={styles.contentDeleteModal}>
                        Are you sure you want to delete this EXIS?
                      </div>
                      <div className={styles.deleteExisWrapper}>
                        <div className={styles.deleteExisDate}>
                          {deletingExis && new Date(deletingExis.date).toLocaleDateString()}
                        </div>
                        <div className={styles.deleteExisText}>{deletingExis?.text}</div>
                      </div>
                      <div className={styles.buttonWrapper}>
                        <Button
                          className={styles.cancelButton}
                          outlined
                          onClick={() => setOpenDeleteExis(false)}
                        >
                          Cancel
                        </Button>
                        <Button className={styles.logoutButton} onClick={deleteExis}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Modal>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.noExis}>No EXIS</div>
        )}
        <div className={exisInputWrapperClassnames}>
          <div className={styles.horizontalLine} />
          {editingExis ? (
            <div className={styles.wrapperEdittingInpt}>
              <div className={styles.labelEdittingInput}>
                <EditIcon />
                Editing
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
                placeholder="Enter EXIS"
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
