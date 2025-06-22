<?php

declare(strict_types=1);

namespace App\Telegram\Commands\Data;

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
        $this->replyWithMessage([
            'text' => __('telegram.status_requested'),
        ]);
    }
}
