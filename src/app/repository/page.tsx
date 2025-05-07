'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Repository } from '@/interfaces';
import RepositoryService from '@/services/repository.service';
import { useEffect, useState } from 'react';
import { Charts } from './charts';

const RepositoryPage = () => {
  const [datas, setDatas] = useState<Repository[]>([]);

  const [name, setName] = useState<string>('');
  const [repository, setRepository] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    RepositoryService.updateRepository();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await RepositoryService.getRepository();
      setDatas(res.data);
    };
    fetch();
  }, []);

  const handleClickUrl = (url: string) => {
    window.open(url);
  };

  const shortCuts = [
    {
      title: 'bitnami',
      url: 'https://charts.bitnami.com/bitnami',
    },
  ];

  return (
    <>
      {shortCuts.map((shortcut) => {
        return (
          <Button
            key={shortcut.title}
            onClick={() =>
              RepositoryService.addRepository({
                name: shortcut.title,
                url: shortcut.url,
              })
            }
          >
            {' '}
            {shortcut.title}{' '}
          </Button>
        );
      })}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <span> Add Repository </span>
          </CardTitle>
          <CardDescription> Helm Repository URL </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            className="mb-2"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            className="mb-2"
            value={repository}
            placeholder="repository"
            onChange={(e) => setRepository(e.target.value)}
          />

          <div className="flex items-center mb-2">
            <Input
              className="mr-2"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() =>
                RepositoryService.addRepository({
                  name,
                  url: repository,
                  username,
                  password,
                })
              }
            >
              Create
            </Button>
          </div>
        </CardContent>
      </Card>
      {datas.map((data, i) => {
        return (
          <Card key={i} className="w-full mt-2">
            <Accordion type="single">
              <AccordionItem value="test">
                <CardHeader>
                  <CardTitle>
                    <AccordionTrigger>
                      <span>{data.name}</span>
                      <a
                        target="_blank"
                        className="ml-2 text-gray-300"
                        href={data.url}
                      >
                        ({data.url})
                      </a>
                    </AccordionTrigger>
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <AccordionContent>
                    <Charts name={data.name} />
                  </AccordionContent>
                </CardContent>

                <CardFooter>
                  <div className="flex-1" />
                  <Button
                    color="error"
                    onClick={() =>
                      RepositoryService.remoteRepository(data.name)
                    }
                  >
                    {' '}
                    삭제{' '}
                  </Button>
                </CardFooter>
              </AccordionItem>
            </Accordion>
          </Card>
        );
      })}
    </>
  );
};

export default RepositoryPage;
