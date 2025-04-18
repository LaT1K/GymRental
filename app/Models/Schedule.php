<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $table = 'schedule';

    protected $fillable = [
        'period_id',
        'date',
        'day',
        'start_time',
        'end_time',
        'type',
        'booking_type',
        'is_processed',
    ];
}
