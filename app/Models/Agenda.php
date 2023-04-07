<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{
    use HasFactory;

    protected $table = 'agenda';

    public $timestamps = false;

    protected $primaryKey = 'INT_ID';

    protected $fillable = [
        'INT_ID',
        'INT_ID_EMPRESA',
        'INT_ID_PACIENTE',
        'DATE_INICIO_AGENDOU',
        'DATE_FIM_AGENDOU',
        'INT_ID_CADASTRO',
        'DATE_CADASTRO',
        'INT_ID_ALTERACAO',
        'DATE_ALTERACAO',
        'INT_ID_EXCLUSAO',
        'DATE_EXCLUSAO',
        'BOOL_ATIVO',
    ];

    //Relacionamento
    public function paciente()
    {
        //$this->belongsTo(relação, chave estrangeira local, primary key da relação);
        return $this->belongsTo('App\Models\ClienteFornecedor', 'INT_ID_PACIENTE', 'INT_ID');
    }

    //Relacionamento 1 para muitos
    public function treino()
    {
        //     $this->hasMany(relação, chave estrangeira da relação, primary key local);
        return $this->hasMany('App\Models\Treino', 'INT_ID_AGENDA', 'INT_ID');
    }
}
