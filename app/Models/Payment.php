<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = ['alias_id', 'participant_id', 'date', 'amount', 'purpose'];

    public function alias()
    {
        return $this->belongsTo(Alias::class, 'alias_id');
    }

    public function participant()
    {
        return $this->belongsTo(Participant::class, 'participant_id');
    }
}
