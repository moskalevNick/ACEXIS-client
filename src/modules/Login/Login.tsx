import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/exports';
import Logo from '../../assets/images/logo.png';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { ControlWrapperForm } from '../../components/ControlWrapper/ControlWrapperForm';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { ToggleSwitch } from '../../components/ToggleSwitch/ToggleSwitch';
import { MoonIconPreview } from '../../components/Icons/MoonIconPreview';
import { PlanetIcon } from '../../components/Icons/PlanetIcon';
import { useSelector } from 'react-redux';
import { selectTheme, setFSCameraOpen, setTheme } from '../../redux/reducers/globalReducer';
import styles from './Login.module.css';

type FormType = {
  login: string;
  password: string;
  isRemember: boolean;
};

const defaultValues: FormType = {
  login: '',
  password: '',
  isRemember: false,
};

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRemember, setRemember] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isRus, setIsRus] = useState(false);
  const theme = useSelector(selectTheme);

  const methods = useForm<FormType>({
    mode: 'onChange',
    defaultValues,
  });

  useEffect(() => {
    dispatch(setFSCameraOpen(false));
  }, []);

  useLayoutEffect(() => {
    document.body.setAttribute('color-theme', theme === 'light' ? 'light' : 'dark');
  }, [theme]);

  const { handleSubmit, watch } = methods;

  let formData = watch();

  const login = () => {
    formData = { ...formData, isRemember: isRemember };
    if (formData.login && formData.password) {
      navigate('/', { replace: true });
    } else {
      setLoginError(true);
    }
  };

  const submit = handleSubmit(login);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.formContainer}>
          <img src={Logo} width="168" height="59" alt="ACEXIS logo" className={styles.logo} />
          <FormProvider {...methods}>
            <form noValidate onSubmit={submit} autoComplete="off">
              <ControlWrapperForm label="Login" name="login" error={loginError}>
                <Input placeholder="Enter your login" />
              </ControlWrapperForm>
              <ControlWrapperForm label="Password" name="password" error={loginError}>
                <Input placeholder="Enter your password" />
              </ControlWrapperForm>
              {loginError && <ErrorMessage msg="Wrong login or password" />}
              <div className={styles.buttonsContainer}>
                <span className={styles.checkbox}>
                  <Checkbox
                    checked={isRemember}
                    onChange={() => setRemember((prev) => !prev)}
                    label={<div className={styles.label}>Remember</div>}
                  />
                </span>
                <Button className={styles.button} type="submit">
                  Log in
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
        <div className={styles.wrapperToggleEng}>
          <ToggleSwitch
            checked={isRus}
            onChange={() => setIsRus((prev) => !prev)}
            labels={['РУС', 'ENG']}
          />
        </div>
        <div className={styles.wrapperToggleTheme}>
          <ToggleSwitch
            checked={theme === 'light'}
            onChange={() => {
              dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
            }}
          />
        </div>
      </main>
      <div className={styles.side}>
        <div className={styles.preview} />
        <div className={styles.moon}>
          <MoonIconPreview />
        </div>
        <div className={styles.planet}>
          <PlanetIcon />
        </div>
      </div>
    </div>
  );
};
