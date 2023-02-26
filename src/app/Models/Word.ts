import { Meaning } from "./Meaning";
import { Sentence } from "./Sentence";

export class Word {
    public wordName: string;
    public pronunciation: string;
    public chapter: string;
    public category?: string;
    public isImportant?: string;
    public meanings?: Meaning[];
    public sentences?: Sentence[];
}