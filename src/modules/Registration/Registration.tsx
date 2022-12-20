import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Logo from '../../assets/images/logo.png';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { ControlWrapperForm } from '../../components/ControlWrapper/ControlWrapperForm';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { ToggleSwitch } from '../../components/ToggleSwitch/ToggleSwitch';
import styles from './Registration.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { globalSettingActions } from '../../redux/global/reducer';
import { globalActions } from '../../redux/global/actions';

type FormType = {
  username: string;
  password: string;
  cameraToken: string;
};

const defaultValues: FormType = {
  username: '',
  password: '',
  cameraToken: '',
};

export const Registration = () => {
  const dispatch = useAppDispatch();
  const [formError, setFormError] = useState(false);
  const { isDark } = useAppSelector((state) => state.globalReducer);
  const isRus = useAppSelector((state) => state.globalReducer.isRus);

  const methods = useForm<FormType>({
    mode: 'onChange',
    defaultValues,
  });

  useEffect(() => {
    dispatch(globalSettingActions.setFSCamera(false));
  }, [dispatch]);

  useLayoutEffect(() => {
    document.body.setAttribute('color-theme', !isDark ? 'light' : 'dark');
  }, [isDark]);

  const { handleSubmit, watch, reset } = methods;

  let formData = watch();

  const register = () => {
    if (formData.username && formData.password) {
      dispatch(globalActions.registration(formData));
      reset();
      setFormError(false);
    } else {
      setFormError(true);
    }
  };

  const submit = handleSubmit(register);

  const logout = async () => {
    await dispatch(globalActions.logout());
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <img src={Logo} width="168" height="59" alt="ACEXIS logo" className={styles.logo} />
          Registration new user
          <FormProvider {...methods}>
            <form noValidate onSubmit={submit} autoComplete="off">
              <ControlWrapperForm label="Username" name="username" error={formError}>
                <Input placeholder="Enter username" />
              </ControlWrapperForm>
              <ControlWrapperForm label="Password" name="password" error={formError}>
                <Input placeholder="Enter password" />
              </ControlWrapperForm>
              <ControlWrapperForm label="Camera token" name="cameraToken" error={formError}>
                <Input placeholder="Enter camera token" />
              </ControlWrapperForm>
              {formError && <ErrorMessage msg="incorrect username or password" />}
              <div className={styles.buttonsContainer}>
                <Button className={styles.button} type="submit">
                  Register
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
        <div className={styles.wrapperToggleEng}>
          <ToggleSwitch
            checked={isRus}
            onChange={() => {
              dispatch(globalSettingActions.setIsRussian(isRus ? false : true));
            }}
            labels={['РУС', 'ENG']}
          />
        </div>
        <div className={styles.wrapperToggleTheme}>
          <ToggleSwitch
            checked={!isDark}
            onChange={() => {
              dispatch(
                globalActions.editSettings({
                  isDark: !isDark,
                }),
              );
            }}
          />
        </div>
        <div className={styles.wrapperLogoutButton}>
          <Button className={styles.button} onClick={logout}>
            Logout
          </Button>
        </div>
      </main>
    </div>
  );
};
