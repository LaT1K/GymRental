<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = ['period_id', 'date', 'day', 'type', 'is_booked'];

    public function gamePeriod()
    {
        return $this->belongsTo(GamePeriod::class, 'period_id');
    }

    public function hallBooking()
    {
        return $this->hasOne(HallBooking::class);
    }
}
