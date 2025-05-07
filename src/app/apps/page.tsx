'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AppService from '@/services/apps.service';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { InstalledApp } from '../api/apps/app.entity';

const Apps = () => {
  const [datas, setDatas] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await AppService.getApps();
      setDatas(res.data);
    };
    fetch();
  }, []);

  const handleDelete = (name: string, namespace: string) => {
    if (!confirm(`정말 삭제하시겠습니까?`)) {
      return;
    }
    AppService.deleteApp(name, namespace);
  };
  return (
    <>
      {datas.map((data: InstalledApp, i) => {
        return (
          <Card key={i} className="w-full">
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between">
                  <span>
                    {' '}
                    {data.name} ( {data.chart} )
                  </span>

                  <span>{data.updated}</span>
                </div>
              </CardTitle>
              <CardDescription>
                <span> {data.namespace} </span>
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Link href={`/apps/${data.namespace}/${data.name}`}>
                <Button> 조회 </Button>
              </Link>
              <Button className="mx-2"> 수정 </Button>
              <Button onClick={() => handleDelete(data.name, data.namespace)}>
                {' '}
                삭제{' '}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
};

export default Apps;
