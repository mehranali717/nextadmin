"use server";

import { revalidatePath } from "next/cache";
import { Product, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);
  try {
    connectToDB();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
      isActive,
    });
    await newUser.save();
  } catch (error) {
    throw new Error("failed to create user!");
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("failed to delete User");
  }
  revalidatePath("/dashboard/users");
};

export const fetchUser = async (id) => {
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error("failed to fetch user!");
  }
};

export const updateUser = async (formData) => {
  const { id, username, email, password, isAdmin, isActive, phone, address } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const updateFiels = {
      id,
      username,
      email,
      password,
      isAdmin,
      isActive,
      phone,
      address,
    };
    Object.keys(updateFiels).forEach(
        (keys)=>(updateFiels[keys] === "" || undefined) && delete updateFiels[keys]
    )
    await User.findByIdAndUpdate(id, updateFiels)
  } catch (error) {
    throw new Error("failed to update user!");
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};
export const addProduct = async (formData) => {
  const { title, desc, price, stock, color, size } =
    Object.fromEntries(formData);
  try {
    connectToDB();
    const newProduct = new Product({
      title,
      desc,
      price,
      stock,
      color,
      size,
    });
    await newProduct.save();
  } catch (error) {
    throw new Error("failed to create product!");
  }
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("failed to delete!");
  }
  revalidatePath("/dashboard/products");
};

export const fetchProduct = async (id) => {
  try {
    connectToDB();
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    throw new Error("failed to fetch product!");
  }
};

export const updateProduct = async (formData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const updateFields = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };
    Object.keys(updateFields).forEach(
      (keys) =>
        (updateFields[keys] === "" || undefined) && delete updateFields[keys]
    );
    await Product.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    throw new Error("failed to update product");
  }
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};
