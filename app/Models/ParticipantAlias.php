<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ParticipantAlias extends Pivot
{
    protected $table = 'participant_aliases';

    public $timestamps = false;
}
