import {yupResolver} from "@hookform/resolvers/yup";
import React, {FC, useEffect, useRef, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import * as yup from "yup";

import {formatPhoneNumber} from "../../../helper/Form/PhoneNumber";
import {Inputs} from "../../../interface/components/Form/InputsInterface";
import {testTaskService} from "../../../services/testTaskService";
import {MainButton} from "../../MainButton/MainButton";
import 'react-toastify/dist/ReactToastify.css';

const Form: FC<{setRefetch: (a: boolean) => void;}> = ({setRefetch}) => {
  const schema = yup.object().shape({
    name: yup.string()
      .required('This field is required')
      .min(2, 'Name should be at least 2 characters long')
      .max(60, 'Name should be no longer than 60 characters'),
    email: yup.string()
      .required('This field is required')
      .email('Please enter a valid email address'),
    phone: yup.string()
      .required('This field is required'),
    position_id: yup.string()
      .required('Please select your position'),
    file: yup.mixed()
      .required('This field is required')
      .test('fileType', 'Please upload a valid jpeg/jpg file', (value: any) => {
        if (value && value.length) {
          const fileType = value.find((el:File) =>el.type);
          return fileType === 'image/jpeg' || fileType === 'image/jpg';
        }
        return true;
      })
      .test('fileSize', 'Please upload an image with size not exceeding 5MB', (value:any) => {
        if (value && value.length) {
          const fileSize = value.find((el:File) => el.size);
          return fileSize / 1024 / 1024 <= 5;
        }
        return true;
      }),
  });
  const [positions, setPosition] = useState<[positions: {
        id: number;
        name: string;
    }] | null>(null)

  const [photoName, setPhotoName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('+38');
  const input = useRef<HTMLInputElement>(null)

  const {register,handleSubmit, setError, reset , setValue, formState: { errors, dirtyFields },  } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });
  const isValid = (Object.keys(dirtyFields)?.length === 3) && !!photoName?.length && +phoneNumber?.length === 19;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    data.phone = data.phone?.replace(/\D/g, "");
    data.phone = '+' + data.phone
    const checkNumber = /^\+{0,1}380([0-9]{9})$/;
    if (!checkNumber.test(data.phone)){
      setError('phone',{type:"pattern"})
      return null
    }
    if (input?.current?.files === null){
      return null
    }

    try {
      const {token} = await testTaskService.getToken()
      await testTaskService.postUsers({
        formData: {
          position_id: +data.position_id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          photo: input?.current?.files[0]
        }
      },token)
      setRefetch(true)
      document.createElement('p').id = 'refetch'
      reset()
      setPhoneNumber('+38')
    }catch (e :any) {
      toast.error(e.response.data.message)
    }

  }
  useEffect(()=>{
    (async ()=>{
      const data = await testTaskService.getPositions()
      setPosition(data.positions as [positions: {
          id: number;
          name: string;
      }] )
    })()
  },[])
  return (
    <>
      <ToastContainer/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input__container">
          <input type="text"  {...register("name")} placeholder="Name" />
          {errors.name && <p className="input__container_error">{errors.name.message}</p>}
        </div>

        <div className="input__container">
          <input type="email" {...register("email")} placeholder="Email" />
          {errors.email && <p className="input__container_error">{errors.email.message}</p>}
        </div>

        <div className="input__phone input__container">
          <input  {...register("phone")} type="tel" value={phoneNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPhoneNumber(formatPhoneNumber(e.target.value.toString()))
          }} placeholder="Phone" />
          <span>+38 (XXX) XXX - XX - XX</span>
          {errors.phone && <p className="input__container_error">{errors.phone.message}</p>}
          {errors.phone && errors.phone.type === "pattern" && (
            <p className="input__container_error">Please enter a valid phone number starting with +380</p>
          )}
        </div>

        <div className="radio__container input__container">
          <p>Select your position</p>

          {positions && positions.map((position) => (
            <div key={position.id} className='radio__input'>
              <label>
                <input
                  {...register('position_id',)}
                  type="radio"
                  value={position.id}
                  className="form-check-input"
                />{' '}
                <p>
                  {position.name}
                </p>
              </label>
            </div>
          ))}
          {errors.position_id && <p className="input__container_error">{errors.position_id.message}</p>}

        </div>
        <div className="upload-file__container input__container">
          <input type="file" ref={input} name='file' onChange={(e:any)=> {
            setValue('file',e?.target?.files[0])
            setPhotoName(e?.target?.files[0]?.name)}} />
          <div className="upload-file__container-left">Upload</div>
          <div className="upload-file__container-right">{photoName ? photoName :"Upload your photo"}</div>
          {errors.file && <p className="input__container_error">{errors.file.message}</p>}
        </div>

        <MainButton text="Sign up" callback={()=>onSubmit} disabled={!isValid}/>
      </form>
    </>
  );
};

export {Form};