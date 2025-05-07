'use client';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AppService from '@/services/apps.service';
import yaml from 'js-yaml';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ViewYaml = () => {
  const params = useParams();
  const { namespace, name } = params;

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await AppService.getInstalledApp(name, namespace);
      setData(res.data);
    };
    fetch();
  }, []);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <span>
                {' '}
                {data.name} ( {data.chart} )
              </span>

              <span>{data.deployedAt}</span>
            </div>
          </CardTitle>
          <CardDescription>
            <span> {data.namespace} </span>
          </CardDescription>
        </CardHeader>
      </Card>
      <pre>{yaml.dump(yaml.load(data?.value))}</pre>
    </>
  );
};

export default ViewYaml;
