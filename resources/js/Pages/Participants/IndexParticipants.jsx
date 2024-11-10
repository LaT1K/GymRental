import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import ParticipantList from '@/Components/ParticipantList';

const IndexParticipants = () => {
    const { participants } = usePage().props;

    return (
        <>
            <Head title="Список учасників" />
            <div className="container mx-auto mt-8">
                <ParticipantList participants={participants} />
                <Link href="/participants/create" className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded">
                    Додати учасника
                </Link>
            </div>
        </>
    );
};

export default IndexParticipants;
