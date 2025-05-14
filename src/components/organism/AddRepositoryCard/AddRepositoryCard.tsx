"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Input } from "../../ui/input";
import { addRepository } from "./action";

export const AddRepositoryCard: React.FC = () => {
  const [name, setName] = useState("");
  const [repository, setRepository] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleRepositoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepository(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("url", repository);
    formData.append("username", username);
    formData.append("password", password);
    await addRepository(formData);
    setName("");
    setRepository("");
    setUsername("");
    setPassword("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <span> Add Repository </span>
        </CardTitle>
        <CardDescription> Helm Repository URL </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit}>
          <Input
            className="mb-2"
            value={name}
            placeholder="name"
            onChange={handleNameChange}
          />
          <Input
            className="mb-2"
            value={repository}
            placeholder="repository"
            onChange={handleRepositoryChange}
          />

          <div className="flex items-center mb-2">
            <Input
              className="mr-2"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
