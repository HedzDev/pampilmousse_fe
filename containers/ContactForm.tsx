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
        <title>Pampilmousse | Contact</title>
        <meta
          name="contact form for friendly connection"
          content="Friendly, pour des sorties réussies"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen">
        <div className="bg-green-300 lg:grid lg:h-2/3 lg:grid-cols-2 lg:gap-6">
          <div className="flex flex-col justify-center text-center md:text-left lg:p-40">
            <h1 className="text-4xl text-white md:text-5xl lg:text-6xl">
              Un endroit à nous conseiller ?
            </h1>
            <p className="mt-10 text-lg font-medium uppercase text-black opacity-50">
              Contactez-nous !
            </p>
          </div>
          <div className="rounded bg-white p-5 pt-6 pb-8 shadow-xl lg:mt-48 lg:mr-48">
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
      </div>
    </>
  );
}

const renderAlert = () => (
  <div className="mb-5 rounded bg-blue-100 px-4 py-3 text-center leading-normal text-blue-700">
    <p>your message submitted successfully</p>
  </div>
);

export default ContactForm;

// import React, { useRef } from 'react';
// import Head from 'next/head';
// import emailjs from '@emailjs/browser';

// export default function ContactForm() {
//   const form = useRef<HTMLFormElement>(null);

//   const sendEmail = (e: any) => {
//     e.preventDefault();
//     const nameInput = form.current?.elements.namedItem(
//       'name'
//     ) as HTMLInputElement;
//     const emailInput = form.current?.elements.namedItem(
//       'email'
//     ) as HTMLInputElement;
//     const messageInput = form.current?.elements.namedItem(
//       'message'
//     ) as HTMLInputElement;

//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

//     if (
//       !nameInput.value ||
//       nameInput.value.trim().length == 0 ||
//       !emailInput.value ||
//       emailInput.value.trim().length == 0 ||
//       !emailRegex.test(emailInput.value) ||
//       !messageInput.value ||
//       messageInput.value.trim().length == 0
//     ) {
//       alert('Veuillez remplir tous les champs du formulaire');
//       return;
//     }

//     emailjs
//       .sendForm(
//         process.env.SERVICE_ID as string,
//         process.env.TEMPLATE_ID as string,
//         form.current as HTMLFormElement,
//         process.env.PUBLIC_KEY as string
//       )
//       .then(
//         (result) => {
//           console.log(result.text);
//         },
//         (error) => {
//           console.log(error.text);
//         }
//       );

//     form.current?.reset();
//   };
//   return (
//     <>
//       <Head>
//         <title>Friendly | Contact</title>
//         <meta
//           name="contact form for friendly connection"
//           content="Friendly, pour des sorties réussies"
//         />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main>
//         <div className="pt-72 text-center">
//           <p>Pour nous contacter c'est ici ⬇️</p>
//         </div>
//         <div className="flex h-screen justify-center pt-28 md:col-span-2 md:mt-0">
//           <form ref={form} onSubmit={sendEmail}>
//             <div className="overflow-hidden shadow sm:rounded-md">
//               <div className="bg-white px-4 py-5 sm:p-6">
//                 <div className="grid grid-cols-6 gap-6">
//                   <div className="col-span-6 sm:col-span-3">
//                     <label className="block text-sm font-medium leading-6 text-gray-900">
//                       Nom
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       placeholder="Doe"
//                       className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                   </div>
//                   <div className="col-span-6 sm:col-span-3">
//                     <label className="block text-sm font-medium leading-6 text-gray-900">
//                       Email
//                     </label>
//                     <input
//                       type="text"
//                       id="email"
//                       name="email"
//                       placeholder="john.doe@gmail.com"
//                       className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                   </div>
//                 </div>
//                 <div className="col-span-6 sm:col-span-3">
//                   <label className="mt-7 block text-sm font-medium leading-6 text-gray-900">
//                     Message
//                   </label>
//                   <textarea
//                     name="message"
//                     id="message"
//                     placeholder="Votre message..."
//                     className="mt-2 mb-7 block h-36 w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   />
//                 </div>

//                 <input
//                   type="submit"
//                   value="Envoyer"
//                   className="mt-4 w-fit rounded border py-2 px-6 transition-all duration-300 ease-in-out hover:bg-slate-600 hover:text-white"
//                 />
//               </div>
//             </div>
//           </form>
//         </div>
//       </main>
//     </>
//   );
// }
