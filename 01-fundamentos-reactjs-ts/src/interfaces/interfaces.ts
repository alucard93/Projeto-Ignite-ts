// INTERFACE POST
export interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

// tipando o objetos
export interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];
}

export interface Content {
    type: 'paragraph' | 'link';
    content: string;
}
// FIM INTERFACE POST

export interface CommentProps {
    content: string;
    deleteComment: (comment: string) => void;
}