"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SchoolForm = () => {
   // fileupload 
   const [file, setFile] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submittedData, setSubmittedData] = useState({});

  const onSubmit = async (data) => {
    console.log(data);
    debugger;
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    console.log(data);

    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      fetch("http://localhost:3000/api/school-data", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));
    } catch (error) {
      console.log("error", error);
    }
  };


// file upload
// const onFileSubmit = async (e) => {
//   e.preventDefault()
//   if (!file) return

//   try {
//     const data = new FormData()
//     data.set('file', file)

//     const res = await fetch(`${API}`, {
//       method: 'POST',
//       body: data
//     })
//     // handle the error
//     if (!res.ok) throw new Error(await res.text())
//   } catch (e) {
//     // Handle errors here
//     console.error(e)
//   }
// }


// 




  return (
    <div className="form_Container  mt-4 ">
      <div className="img_container">
        <img
          src="https://cdn.vectorstock.com/i/preview-2x/24/73/3d-search-icon-vector-44382473.webp"
          className=" mix-blend-multiply "
          alt="vector"
        />
      </div>

      <div className="conatiner">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="name"
            placeholder="School Name"
            {...register("name", { required: "School name is required" })}
          />
          {errors.name && <p>{errors.name.message}</p>}
          <input
            name="address"
            placeholder="School address"
            {...register("address", { required: "School address is required" })}
          />
          {errors.address && <p>{errors.address.message}</p>}
          <input
            name="city"
            placeholder="School city"
            {...register("city", { required: "School city is required" })}
          />
          {errors.city && <p>{errors.city.message}</p>}
          <input
            name="state"
            placeholder="State Name"
            {...register("state", { required: "State name is required" })}
          />
          {errors.state && <p>{errors.state.message}</p>}
          <input
            type="number"
            name="contact"
            placeholder="contact Number"
            {...register("contact", { required: "Contact number is required" })}
          />
          {errors.contact && <p>{errors.contact.message}</p>}
          <input
     
            name="image"
            placeholder="image"
            {...register("image", { required: "image is required" })}
            defaultValue={
              "https://img.freepik.com/free-vector/large-school-building-scene_1308-32058.jpg"
            }
          />
          {errors.image && <p>{errors.image.message}</p>}
          <input
            name="email"
            placeholder="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}

          <button
            type="submit"
            className=" m-3 bg-red-300   hover:bg-green-300 ease-in-out transition-all  duration-75  hover:text-black p-2 rounded-md text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SchoolForm;
