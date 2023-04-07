<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClienteFornecedor extends Model
{
    use HasFactory;

    protected $table = 'cliente_fornecedor';

    public $timestamps = false;

    protected $primaryKey = 'INT_ID';

    protected $fillable = [
        'INT_ID_EMPRESA',
        'TXT_NOME',
        'TXT_NOME_FANTASIA',
        'TXT_CPF_CNPJ',
        'BOOL_PF_PJ',
        'BOOL_ATIVO',
        'TXT_RUA',
        'TXT_BAIRRO',
        'TXT_CIDADE',
        'TXT_NUMERO',
        'TXT_UF',
        'TXT_CEP',
        'BOOL_PACIENTE',
        'TXT_QUEIXA',
        'DATE_NASCIMENTO',
        'TXT_PROFISSAO',
        'CHAR_DESTRO_CANHOTO',
        'CHAR_SEXO',
        'TXT_FOTO',
    ];

    //Relacionamento 1 para muitos
    public function contato()
    {
        //     $this->hasMany(relação, chave estrangeira da relação, primary key local);
        return $this->hasMany('App\Models\Contato', 'INT_ID_CLIENTE_FORNECEDOR', 'INT_ID');
    }

    //Relacionamento 1 para muitos
    public function avaliacao()
    {
        //     $this->hasMany(relação, chave estrangeira da relação, primary key local);
        return $this->hasMany('App\Models\Avaliacao', 'INT_ID_PACIENTE', 'INT_ID');
    }

    //Relacionamento 1 para muitos
    public function agenda()
    {
        //     $this->hasMany(relação, chave estrangeira da relação, primary key local);
        return $this->hasMany('App\Models\Agenda', 'INT_ID_PACIENTE', 'INT_ID');
    }

    //Relacionamento 1 para muitos
    public function treino()
    {
        //     $this->hasMany(relação, chave estrangeira da relação, primary key local);
        return $this->hasMany('App\Models\Treino', 'INT_ID_PACIENTE', 'INT_ID');
    }
}
