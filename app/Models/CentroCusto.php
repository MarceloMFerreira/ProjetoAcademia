<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CentroCusto extends Model
{
    use HasFactory;

    protected $table='centro_de_custos'; 

    public $timestamps = false;
    
    protected $primaryKey = 'INT_ID';

    protected $fillable = [
        'TXT_DESC',
        'INT_ID_EMPRESA',
        'BOOL_ATIVO',
    ];
}
