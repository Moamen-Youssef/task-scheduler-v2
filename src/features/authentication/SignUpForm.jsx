/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { useSignup } from './useSignup';
import SpinnerMini from '../../ui/SpinnerMini';
import { useUpdateUserEmail, useUpdateUserName } from '../user/useUpdateUser';

function SignUpForm({ currentUser = {} }) {
  const { isLoading, signUp } = useSignup();

  const { updateUserName, isNameUpdating } = useUpdateUserName();
  const { updateUserEmail, isEmailUpdating } = useUpdateUserEmail();
  const isWorking = isLoading || isNameUpdating || isEmailUpdating;
  const {
    id: userID,
    email: currentUserEmail,
    user_metadata: userData,
  } = currentUser;
  const isCurrentUser = Boolean(userID);

  const { register, formState, getValues, handleSubmit } = useForm({
    defaultValues: isCurrentUser
      ? {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: currentUserEmail,
        }
      : {},
  });
  const { errors } = formState;
  function onSubmit({ firstName, lastName, email, password }) {
    if (isCurrentUser) {
      if (userData.firstName !== firstName || userData.lastName !== lastName) {
        const newNameData = {
          firstName,
          lastName,
          fullName: `${firstName} ${lastName}`,
        };
        updateUserName(newNameData);
      }
      if (currentUserEmail !== email) {
        updateUserEmail(email);
      }
    } else {
      signUp({
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        email: email,
        password,
      });
    }
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className='min-w-[26rem] sm:min-w-[38rem]'
    >
      <FormRow label='first name *' error={errors?.firstName?.message}>
        <Input
          type='text'
          id='firstName'
          {...register('firstName', {
            required: 'required field !',
            validate: (value) =>
              value.length >= 3 || 'must be 3 characters or more !',
          })}
        />
      </FormRow>
      <FormRow label='last name'>
        <Input
          type='text'
          placeholder='optional..'
          id='lastName'
          {...register('lastName')}
        />
      </FormRow>
      <FormRow label='email *' error={errors?.email?.message}>
        <Input
          type='email'
          placeholder='your email address'
          id='email'
          {...register('email', { required: 'must sign with a valid email !' })}
        />
      </FormRow>
      {!isCurrentUser && (
        <>
          <FormRow label='password *' error={errors?.password?.message}>
            <Input
              type='password'
              id='password'
              {...register('password', {
                required: 'required field !',
                validate: (value) =>
                  value.length >= 8 ||
                  ' create a password with at least 8 characters',
              })}
            />
          </FormRow>
          <FormRow
            label='confirm password *'
            error={errors?.cofirmPassword?.message}
          >
            <Input
              type='password'
              id='confirmPass'
              {...register('cofirmPassword', {
                required: 'required field !',
                validate: (value) =>
                  value === getValues().password || "passwords don't match",
              })}
            />
          </FormRow>
        </>
      )}
      <Button disabled={isWorking}>
        {isWorking ? (
          <SpinnerMini />
        ) : isCurrentUser ? (
          'Update '
        ) : (
          'Create Account'
        )}
      </Button>
    </Form>
  );
}

export default SignUpForm;
