import React, { useState, useEffect } from 'react';
import InputField from '@/components/InputField';
import TextareaField from '@/components/TextareaField';
import Head from 'next/head';
import emailjs from 'emailjs-com';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

function ContactForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    emailjs
      .send(
        process.env.SERVICE_ID as string,
        process.env.TEMPLATE_ID as string,
        values as string | any,
        process.env.PUBLIC_KEY as string
      )
      .then(
        (result) => {
          console.log('SUCCESS', result);
          setValues({
            name: '',
            email: '',
            message: '',
          });
          setStatus('SUCCESS');
        },
        (error) => {
          console.log('FAILED...', error);
        }
      );
  };

  useEffect(() => {
    if (status === 'SUCCESS') {
      setTimeout(() => {
        setStatus('');
      }, 3000);
    }
  }, [status]);

  const handleChange = (e: any) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Head>
        <title>Pampilmousse, pour des sorties réussies | Contact</title>
        <meta
          name="description"
          content="Contactez-nous pour nous faire part de vos suggestions !"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/logo-pampil.ico" />
      </Head>
      <main className="min-h-screen">
        <div className="bg-green-300 px-5 py-44 lg:grid lg:h-2/3 lg:grid-cols-2 lg:gap-6">
          <div className="flex flex-col justify-center text-center md:text-left lg:p-40">
            <h1 className="text-3xl text-white md:text-5xl lg:text-6xl">
              Un endroit à nous conseiller ?
            </h1>
            <p className="mt-10 text-lg font-medium uppercase text-black opacity-50">
              Contactez-nous !
            </p>
          </div>
          <div className="mt-8 rounded bg-white p-5 pt-6 pb-8 shadow-xl lg:mt-48 lg:mr-48">
            {status && renderAlert()}
            <form onSubmit={handleSubmit}>
              <h3 className="mb-7 text-xl font-semibold text-gray-700">
                Envoyez-nous un message 📨
              </h3>
              <InputField
                value={values.name}
                handleChange={handleChange}
                label="Nom & Prénom"
                name="name"
                type="text"
                placeholder="John Doe"
              />
              <InputField
                value={values.email}
                handleChange={handleChange}
                label="E-Mail"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
              />
              <TextareaField
                value={values.message}
                handleChange={handleChange}
                label="Votre message..."
                name="message"
              />
              <button
                type="submit"
                className="mt-4 rounded bg-gray-900 px-4 py-2 text-gray-200 hover:bg-gray-700 focus:outline-none"
              >
                Envoyer <ChevronRightIcon className="float-right ml-2 w-6" />
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

const renderAlert = () => (
  <div className="mb-5 rounded bg-blue-100 px-4 py-3 text-center leading-normal text-green-700">
    <p>Message envoyé avec succès ✅</p>
  </div>
);

export default ContactForm;
