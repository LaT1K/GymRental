<?php

declare(strict_types=1);

namespace App\Enum;

enum GamePeriodStatusEnum: string
{
    case DRAFT = 'draft';
    case PLANNED = 'planned';
    case PLAYING = 'playing';
    case FINISHED = 'finished';

    public static function getList(): array
    {
        $list = [];

        foreach (self::cases() as $case) {
            $list[$case->name] =  $case->name;
        }

        return $list;
    }
}
