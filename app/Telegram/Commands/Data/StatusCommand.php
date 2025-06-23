<?php

declare(strict_types=1);

namespace App\Telegram\Commands\Data;

use App\Models\Participant;
use Telegram\Bot\Commands\Command;

class StatusCommand extends Command
{
    public function __construct()
    {
        $this->setName('status');;
        $this->setDescription(__( 'telegram.status_description'));
    }

    public function handle()
    {
        $participant = Participant::getCurrentParticipant();

        $text = __('telegram.status_of_participant') . PHP_EOL;

        $text .= PHP_EOL;

        $text .= __('telegram.participant_name') . ':';

        $text .= PHP_EOL;

        $text .= $participant->name;

        $text .= PHP_EOL;
        $text .= PHP_EOL;

        $text .= __('telegram.joined_date') . ':';

        $text .= PHP_EOL;

        $text .= $participant->joined_date;

        $text .= PHP_EOL;
        $text .= PHP_EOL;

        $text .= __('telegram.next_play') . ':';

        $this->replyWithMessage([
            'text' => $text,
        ]);
    }
}
