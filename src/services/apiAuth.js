import supabase from './supabase';

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error);
    throw new Error(error);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function logout() {
  const { error } = supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function signUp({
  fullName,
  email,
  password,
  firstName,
  lastName,
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
        firstName,
        lastName,
      },
    },
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function updateUserName(userData) {
  const { data, error } = await supabase.auth.updateUser({ data: userData });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
export async function updataUserEmail(email) {
  const { data, error } = await supabase.auth.updateUser({ email: email });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
