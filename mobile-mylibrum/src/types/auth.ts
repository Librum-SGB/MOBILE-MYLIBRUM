export type LoginRequestDTO = {
    email: string;
    senha: string;
};

export type LoginResponseDTO = {
    token: string;
    type: string;
    message: string;
};
