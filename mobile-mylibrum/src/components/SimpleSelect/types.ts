export type SimpleSelectOption = {
    id: number;
    label: string;
};

export interface SimpleSelectProps {
    label: string | null;
    options: SimpleSelectOption[];
    selectedId?: number;
    onSelect: (id: number) => void;
}
