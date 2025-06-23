<?php

declare(strict_types=1);

namespace App\Telegram\Commands\Data;

use App\Enum\GamePeriodStatusEnum;
use App\Models\GamePeriod;
use App\Models\WeeklyBooking;
use Telegram\Bot\Commands\Command;

class GamePeriods extends Command
{

    public function __construct()
    {
        $this->setName('game_periods');
        $this->setDescription(__( 'telegram.game_periods_description' ));
    }

    public function handle()
    {

        $periodsQuery = GamePeriod::query();
        $periodsQuery
            ->where('start_date', '<', new \DateTime('2 months ago'))
            ->where('status', '!=', GamePeriodStatusEnum::DRAFT->value)
            ->orderBy('start_date', 'desc')
        ;

        $periods = $periodsQuery->get();

        $text = __('telegram.game_periods') . PHP_EOL;

        $text.= PHP_EOL;
        $text.= PHP_EOL;

        foreach ($periods as $period) {
            $text .= __('telegram.game_period'). PHP_EOL;
            $text .= $period->start_date->format('Y-m-d') . ' - ' . $period->end_date->format('Y-m-d') . PHP_EOL;
            $text .= __('telegram.game_period_duration_weeks') . ' - ' . $period->duration_weeks . PHP_EOL;
            $text .= __('telegram.game_period_status.') . $period->status . PHP_EOL;
            $text .= PHP_EOL;
            $text .= PHP_EOL;
            
            $bookings = WeeklyBooking::query()
                ->where('period_id', $period->id)
                ->get();
            
            if($period->)
        }

        $this->replyWithMessage([
            'text' => $text,
        ]);
    }

}
