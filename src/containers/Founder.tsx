import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { clientActions } from '../redux/clients/actions';
import { clientSettingsActions } from '../redux/clients/reducers';

export type FounderProps = {
  component: FC<any>;
};

export const Founder: FC<FounderProps> = ({ component: Component }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) {
      navigate('/cloud');
    }

    if (id === 'new') {
      const newClientForServer = {
        name: '',
        status: 'ghost',
        phone: '',
      };

      const newClientData = {
        ...newClientForServer,
        id: 'new',
        images: [],
      };

      dispatch(clientSettingsActions.setCurrentClient(newClientData));
      dispatch(clientActions.addClient(newClientForServer));
    }

    if (id && id !== 'new') {
      dispatch(clientActions.getClient(id));
    }
  }, [id, dispatch, navigate]);

  return <Component />;
};
