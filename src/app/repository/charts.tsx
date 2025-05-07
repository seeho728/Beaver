import RepositoryService from '@/services/repository.service';
import React, { useEffect, useState } from 'react';

interface ChartsProps {
  name: string;
}
export const Charts: React.FC<ChartsProps> = ({ name }) => {
  const [data, setDatas] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await RepositoryService.getCharts(name);
      setDatas(res.data);
    };
    fetch();
  }, []);

  return (
    <>
      {data.map((d) => {
        return (
          <div>
            {d.name} : {d.version}
          </div>
        );
      })}
    </>
  );
};
