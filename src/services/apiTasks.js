import supabase from './supabase';

export async function getTasks(id) {
  let { data, error } = await supabase.from('tasks').select('*');

  if (error) {
    console.error(error.message);
    throw new Error('there might be a problem with getting your tasks');
  }

  if (typeof id === 'string' && data)
    return data.filter((task) => task.id === Number(id))[0];

  return data;
}

export async function addTask(task) {
  const { data, error } = await supabase.from('tasks').insert([task]).select();
  if (error) {
    console.error(error);
    throw new Error('there might be a problem with Adding your task');
  }
  return data;
}

export async function updateTask(newUpdatedTask, id) {
  const { data, error } = await supabase
    .from('tasks')
    .update(newUpdatedTask)
    .eq('id', id)
    .select();
  console.log(data);
  if (error) {
    console.error(error);
    throw new Error('there might be a problem with Updating your task');
  }
  return data;
}

export async function deleteTask(id) {
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  
  if (error) {
    console.error(error);
    throw new Error('there might be a problem with Updating your task');
  }
}

