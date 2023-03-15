import React, {FC, useEffect, useState} from 'react';
import {toast, ToastContainer} from "react-toastify";

import {User} from "../../../interface/services/testService";
import {testTaskService} from "../../../services/testTaskService";
import {MainButton} from "../../MainButton/MainButton";

const Users: FC<{ refetch: boolean }> = ({refetch}) => {

  const [users, setUsers] = useState<User[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [dataReq, setDataReq] = useState<{ page: number, count: number, offset: number }>({
    page: 1,
    count: 6,
    offset: 0
  })

  useEffect(() => {
    (async () => {
      dataReq.page = 1
      const data = await testTaskService.getUsers(dataReq)
      setUsers(data.users)
      setTotalPages(data.total_pages)
    })()
  }, [refetch])

  useEffect(() => {
    (async () => {
      try {

      } catch (e: unknown) {
        if (e instanceof Error) {
          toast.error(e.message)
        } else {
          toast.error('An unknown error occurred:')
        }
      }
      const data = await testTaskService.getUsers(dataReq)
      setTotalPages(data.total_pages)
      const notDuplicatePerson = Array.from(new Set([...users, ...(data?.users ?? [])]));
      const uniqueArray = notDuplicatePerson.filter(
        (item, index, array) => index === array.findIndex(obj => obj.id === item.id && obj.name === item.name)
      );

      setUsers(uniqueArray)
    })()
  }, [dataReq?.page])

  function handleShowMore() {
    setDataReq(prevData => {
      const nextPage = prevData.page + 1;
      const newOffset = (nextPage * 6);
      return {...prevData, page: nextPage, offset: newOffset};
    });
  }

  return (
    <>
      <ToastContainer/>
      <div className="section__get_users">
        {
          !!users?.length && users.map(value => {
            return (
              <div key={value.id} className="user__container">
                <div className="user__container_img-name">
                  <div className="user__container_img">
                    <img src={value?.photo} alt={value?.name}/>
                  </div>
                  <div className="user__container_name">{value?.name}</div>
                </div>
                <div className="user__container_desc">
                  <div className="desc__position">{value?.position}</div>
                  <div className="desc__email">{value?.email}</div>
                  <div className="desc__phone">{value?.phone}</div>
                </div>
              </div>
            )
          })
        }
      </div>
      {totalPages !== dataReq.page  ? <MainButton text="Show more" callback={() => {
        handleShowMore()
      }}/> : ''}
    </>
  );
}
    ;

export {Users};