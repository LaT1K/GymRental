<?php

declare(strict_types=1);

namespace App\Telegram\Commands\Data;

use App\Models\BookingPlan;
use App\Models\GamePeriod;
use Telegram\Bot\Commands\Command;
use const _PHPStan_f2f2ddf44\__;

class BookingsCommand extends Command
{

    public function __construct()
    {
        $this->setName('bookings');
        $this->setDescription(__( 'telegram.bookings_description' ));
    }

    public function handle()
    {
        $text = __('telegram.current_period') . PHP_EOL;

        $text.= PHP_EOL;

        // Old periods
        $periodsQuery = GamePeriod::query();
        $periodsQuery
            ->where('start_date', '<', new \DateTime('2 months ago'))
            ->orderBy('start_date', 'desc')
        ;

        $periods = $periodsQuery->get();



        foreach ($periods as $period) {
            $text .= __('telegram.game_period'). PHP_EOL;
            $text .= $period->start_date->format('Y-m-d') . ' - ' . $period->end_date->format('Y-m-d') . PHP_EOL;
            $text .= PHP_EOL;

            $text .= __('telegram.your_actual_bookings_are') . PHP_EOL;

            Booki
        }

        $text .= __('telegram.your_actual_bookings_are') . PHP_EOL;

        $text .= __('telegram.your_actual_bookings_are_nothing') . PHP_EOL;

        $text .= __('telegram.booking_accounting_status') . __('telegram.booking_accounting_status_value_ok') . PHP_EOL;

        $text .= PHP_EOL;

        $text  .= __('telegram.future_period') . PHP_EOL;

        $text.= PHP_EOL;

        $text .= '2025-07-07 - 2025-07-27';

        $text .= __('telegram.your_actual_bookings_are') . PHP_EOL;

        $text .= 'Cереда' . ' - ' . '19:00' . ' - ' . ' ігровий' . PHP_EOL;
//        $text .= 'Пʼятниця' . ' - ' . '19:00' . ' - ' . ' заняття з тренером' . PHP_EOL;
//        $text .= 'Неділя' . ' - ' . '17:00' . ' гра ';

        $text .= PHP_EOL;

        $text .= __('telegram.booking_accounting_status') . __('telegram.booking_accounting_status_value_not_ok') . PHP_EOL;;

        $text .= PHP_EOL;

        $this->replyWithMessage([
            'text' => $text,
        ]);

        $this->triggerCommand('help');
    }
}
