'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const SigninForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      username: username,
      password: password,
    });

    //if response contains a url link, refresh the page (causes a redirect from middleware)
    if (res?.url) {
      router.refresh();
    }
  };

  return (
    <form onSubmit={submitForm}>
      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Signin</button>
    </form>
  );
};

export default SigninForm;
