import { useController, useFormContext } from 'react-hook-form';
import { ControlWrapper, ControlWrapperProps } from './ControlWrapper';
import React, { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

type ControlWrapperFormProp = Omit<ControlWrapperProps, 'getElementProps'> & {
  name: string;
};

export const ControlWrapperForm: React.FC<ControlWrapperFormProp> = ({
  error: propsError,
  name,
  children,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // @ts-ignore
  const error: boolean | undefined = propsError ?? errors[name]?.message;
  const { field } = useController({
    name,
    control,
  });

  const id = uuidv4();

  const getElementProps = useCallback(
    () => ({
      hasError: Boolean(error),
      ...field,
      id,
    }),
    [field, error, id],
  );

  return (
    <ControlWrapper error={error} getElementProps={getElementProps} {...rest}>
      {children}
    </ControlWrapper>
  );
};
