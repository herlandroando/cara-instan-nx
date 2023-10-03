import { ParsedContent } from "@nuxt/content/dist/runtime/types";

export interface TipsContent extends ParsedContent {
    title: string;
    slug: string;
    description: string;
    main_image: string;
    author?: string; // pick one only. if author is not exist, use author_link
    author_link?: string; // pick one only. if author is not exist, use author
    category: 'document' | 'media' | 'it' | 'other';
    type_content: 'gallery' | 'video' | 'article';
    last_update: string;
    published_date: string;
    content: {
        component: 'md' | 'html' | 'text';
        md?: string;
        html?: string;
        text?: string;
    };
    method: {
        key: string;
        type: 'vendor' | 'self';
    }[];
}

export interface Author extends ParsedContent {
    first_name: string;
    last_name: string;
    username: string;
    link?: {
        facebook?: string;
        other?: string;
        instagram?: string;
        linkedin?: string;
        github?: string;
        email?: string;
    }
}

export interface Vendor extends ParsedContent {
    name: string;
    url: string;
    image: string;
    description: string;
}

export interface StepMethod extends ParsedContent {
    body: StepComponent[] | any;
}

export type StepComponent = {
    component: 'image-desc' | 'image-selection-desc' | 'text-desc';
    step: string;
    image?: string;
    alt?: string;
    text?: string;
    md?: string;
    selection?: {
        label: string;
        to: string;
    }[];
    overrideNextTo?: string;
    overridePrevTo?: string;
}

export type SelectionMethodRender = {
    "label": string
    "to": string
}


// {
//     "body": [
//         {
//             "component": "image-tips",
//             "step": "1",
//             "image": "https://i.ibb.co/Lr5BmPt/step-1.png",
//             "md": "/document/i-love-pdf/1.md"
//         },
//         {
//             "component": "image-selection-tips",
//             "step": "2",
//             "image": "https://i.ibb.co/LQzdFbT/step-2.png",
//             "text": "Setelah anda mengklik sebelumnya, maka akan muncul tampilan seperti gambar diatas. Pilih file yang akan diubah menjadi dokumen Word. Ada dua cara untuk memilih file, yaitu:",
//             "selection": [
//                 {
//                     "label": "Klik tombol \"Pilih file\"",
//                     "to": "2a"
//                 },
//                 {
//                     "label": "Drag and drop file",
//                     "to": "2b"
//                 }
//             ]
//         },
//         {
//             "component": "image-tips",
//             "step": "2a",
//             "image": "https://i.ibb.co/jr4n6Hd/step-2a.gif",
//             "text": "Klik tombol \"Pilih file\" dan pilih file yang akan diubah menjadi Word.",
//             "overrideNextTo": "3",
//             "overridePrevTo": "2"
//         },
//         {
//             "component": "image-tips",
//             "step": "2b",
//             "image": "https://i.ibb.co/XWXrp9k/step-2b.gif",
//             "text": "Drag and drop file yang akan diubah menjadi dokumen Word.",
//             "overrideNextTo": "3",
//             "overridePrevTo": "2"
//         },
//         {
//             "component": "image-tips",
//             "step": "3",
//             "image": "https://i.ibb.co/0jJQJ3Q/step-3.png"
//         }
//     ]
// }