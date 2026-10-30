export type Biblioteca = {
  id: string;
  nome: string;
  cidade: string;
  endereco: string;
  horario: string;
  telefone: string;
  latitude: number;
  longitude: number;
};

// Endereços e horários: https://sc.senai.br/bibliotecas/contatos
// Coordenadas de referência da unidade (não substituem a navegação pelo endereço).
export const BIBLIOTECAS: Biblioteca[] = [
  {
    id: 'itajai', nome: 'Biblioteca SENAI Itajaí', cidade: 'Itajaí',
    endereco: 'Rua Henrique Vigarani, 163, Barra do Rio, Itajaí - SC',
    horario: 'Seg/qui/sex 8h–12h e 13h30–17h30; ter/qua até 22h',
    telefone: '(47) 3341-2905', latitude: -26.88741, longitude: -48.67782,
  },
  {
    id: 'bc', nome: 'Biblioteca SENAI Balneário Camboriú', cidade: 'Balneário Camboriú',
    endereco: 'Rua Angelina, 555, Municípios, Balneário Camboriú - SC',
    horario: 'Seg–sex, 13h30–22h', telefone: '(47) 3341-2960',
    latitude: -27.00813, longitude: -48.64117,
  },
  {
    id: 'brusque', nome: 'Biblioteca SESI SENAI Brusque', cidade: 'Brusque',
    endereco: 'Av. 1º de Maio, 670, Primeiro de Maio, Brusque - SC',
    horario: 'Seg–sex, 7h30–11h40, 13h–17h e 18h–22h',
    telefone: '(47) 3251-8921', latitude: -27.11574, longitude: -48.91008,
  },
  {
    id: 'blumenau', nome: 'Biblioteca SESI SENAI Blumenau', cidade: 'Blumenau',
    endereco: 'Rua São Paulo, 1147, Victor Konder, Blumenau - SC',
    horario: 'Seg–sex, 7h30–22h', telefone: '(47) 3321-9631',
    latitude: -26.9066204, longitude: -49.0760841,
  },
];
