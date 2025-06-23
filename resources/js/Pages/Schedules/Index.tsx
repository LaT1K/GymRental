import { Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Pagination from '@/Components/Pagination/Pagination';
import FilterBar, { FilterBarField } from '@/Components/FilterBar/FilterBar';
import { Participant, PaginatedData } from '@/types';
import Table from '@/Components/Table/Table';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useState } from 'react';
import DateFilterInputComponent from '@/Components/FilterBar/DateFilterInputComponent';

type Schedule = {
  id: number;
  period_id: number;
  day: string;
  start_time: string;
  end_time: string;
  type: string;
};

type PaginatedData<T> = {
  data: T[];
  meta: { links: any[] };
};

type GamePeriod = {
  id: number;
  start_date: string;
  end_date: string;
};

const Index  = ()=> {
  const { t } = useLaravelReactI18n();
  const { schedules, gamePeriod } = usePage<{ schedules: PaginatedData<Schedule>, gamePeriod: GamePeriod }>().props;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">{t('participants.title')}</h1>
      <div className="flex items-center justify-between mb-6">
        <Link
          href={route('game_periods.index')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          {t('game_periods.index')}
        </Link>
        <span className="font-medium text-indigo-600"> / </span>
        <Link
          href={route('game_periods.edit', {gamePeriod: gamePeriod.id})}
          className="text-indigo-600 hover:text-indigo-700"
        >
          {t('game_periods.game_period')} {gamePeriod.start_date} - {gamePeriod.end_date}
        </Link>
        <span className="font-medium text-indigo-600"> / </span>
        <Link
          href={route('schedules.index', {gamePeriod: gamePeriod.id})}
          className="text-indigo-600 hover:text-indigo-700"
        >
          {t('schedules.index')}
        </Link>
        <span className="font-medium text-indigo-600"> / </span>
      </div>
      <div className="flex items-center justify-between mb-6">
        <Link
          className="btn-indigo focus:outline-none"
          href={route('schedules.create', {gamePeriod: gamePeriod.id})}
        >
          <span>{t('schedules.create')}</span>
        </Link>
      </div>
      {/*<FilterBar filters={filterFields} onSubmit={handleSubmit} />*/}
      <Table
        columns={[
          { label: t('schedule.day'), name: 'day', renderCell: (row) => row.day ? t('common.day_of_week.' + row.day) :'' },
          { label: t('schedule.start_time'), name: 'start_time'},
          { label: t('schedule.end_time'), name: 'end_time' },
          {
            label: t('schedule.type'),
            name: 'type',
            renderCell: row => row.type ? t('schedule.type.' + row.type) :'',
          },
        ]}
        rows={schedules.data}
        getRowDetailsUrl={row => route('schedules.edit', {gamePeriod: gamePeriod.id, schedule: row.id})}
      />
      <Pagination links={schedules.meta.links} />
    </div>
  );
}

Index.layout = (page: React.ReactNode) => <MainLayout title='shedule.index' children={page} />;

export default Index;
