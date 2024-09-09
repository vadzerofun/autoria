import React, { useState } from 'react';
import { Message } from '../Message/Message';
import { useSearchParams } from 'react-router-dom';

export const ConfirmEmail = () => {
  // msg
  const [message, setMessage] = useState({
    title: '',
    msgText: '',
    linkText: '',
    loadHome: false,
  });
  // searchParams
  const [searchParams] = useSearchParams();
  let success = searchParams.get('success');
  if (success == true) {
    message.title = 'Вітаємо';
    message.msgText = 'Ви успішно зареєструвались';
    message.linkText = 'Далі';
    message.loadHome = true;
  } else {
    message.title = 'Упс';
    message.msgText = 'Щось пішло не так';
    message.linkText = 'Повторити';
    message.loadHome = true;
  }

  return (
    <>
      <Message {...message} />
    </>
  );
};
