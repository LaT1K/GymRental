<?php

namespace App\Telegram\Commands\Data;

use Telegram\Bot\Commands\Command;

class TransactionsCommand extends Command
{

    public function __construct()
    {
        $this->setName('transactions');
        $this->setDescription(__( 'telegram.transactions_description'));;
    }

    public function handle()
    {
        $this->replyWithMessage([
            'text' => __('telegram.transactions_requested'),
        ]);
    }
}
