<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voting extends Model
{
    use HasFactory;

    protected $fillable = ['period_id', 'question', 'start_date', 'end_date', 'is_active'];

    public function gamePeriod()
    {
        return $this->belongsTo(GamePeriod::class, 'period_id');
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }
}
