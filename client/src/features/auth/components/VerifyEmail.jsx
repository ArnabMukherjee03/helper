import React, { useEffect } from "react";
// import Sucess from '../../../Image/Success.svg';
import { useSelector, useDispatch } from "react-redux";
import {
  Status,
  selectError,
  selectVerifyStatus,
  selectVerifyUser,
  verifyUserAsync,
} from "../authSlice";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const success = useSelector(selectVerifyStatus);
  const user = useSelector(selectVerifyUser);
  const error = useSelector(selectError);
  const status = useSelector(Status);

  console.log(token);

  useEffect(() => {
    dispatch(verifyUserAsync(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
  }, [success]);

  useEffect(() => {
    if (error && error !== "Unauthorized") {
      toast.error(error);
    }
  }, [error]);

  if (status === "loading") {
    return (
      <div className="font-primary h-screen text-base flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center">
      {success ? (
        <>
          <div className="flex flex-col justify-center items-center gap-3">
            <NavLink to="/">
              <div className="my-auto mx-auto ">
                <div className="font-logo text-[30px] leading-[1]">Helper.</div>
                <div className="flex gap-1">
                  <div className="font-sublogo text-[10px] leading-[1]">
                    COMPANY
                  </div>
                  <span className="bg-black h-2 w-1"></span>
                </div>
              </div>
            </NavLink>
            <p className="text-3xl font-primary">
              Hii <span className="text-[#289c28]">{user}</span>
            </p>
            <p className="text-sm font-secondary">
              Congratulations Your Account Successfully <span className="py-2 px-4 bg-yellow-400">Verified.</span>
            </p>
            <p className="text-sm font-secondary">
              Your Journey Towards Helping Begins Here
            </p>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="flex flex-col justify-center items-center gap-3">
            <p className="text-base text-red-500 font-primary">{error}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
