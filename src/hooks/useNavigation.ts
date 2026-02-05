import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/axios";

export interface NavItem {
    id: number;
    title: string;
    path: string;
    externalPath?: string | null;
    uiRouterKey?: string;
    menuAttached?: boolean;
    order?: number;
    items?: NavItem[];
}

export interface FormattedNavItem {
    id: number;
    href: string;
    label: string;
    items?: FormattedNavItem[]; // Add items for hierarchy
}

const NAVIGATION_IDS = {
    top: "tl0q2viihldmn1tlwdi1050h",
    primary: "vnutr2ypgtiti2wbp72swi0v",
    footer: "tmpi40kmrciwbohfgm1y19mq",
};

type NavigationType = keyof typeof NAVIGATION_IDS;

const fetchNavigation = async (type: NavigationType): Promise<FormattedNavItem[]> => {
    try {
        const id = NAVIGATION_IDS[type];
        const { data } = await apiClient.get<NavItem[]>(
            `/api/navigation/render/${id}`
        );
        // For footer, we need to reconstruct the hierarchy
        if (type === 'footer') {
            const itemsMap = new Map<number, FormattedNavItem & { parentId?: number }>();
            const rootItems: FormattedNavItem[] = [];

            // First pass: create formatted items
            data.forEach(item => {
                itemsMap.set(item.id, {
                    id: item.id,
                    href: item.path || "", // Keep empty path for headers
                    label: item.title,
                    items: [], // Initialize empty items array
                    parentId: (item as any).parent?.id // Helper helper to track relations
                });
            });

            // Second pass: link parents and children
            data.forEach(item => {
                const formattedItem = itemsMap.get(item.id)!;
                // Type assertion or check parent existance
                // In the provided JSON, parent is an object.
                const parentId = (item as any).parent?.id;

                if (parentId && itemsMap.has(parentId)) {
                    const parent = itemsMap.get(parentId)!;
                    parent.items?.push(formattedItem);
                } else {
                    rootItems.push(formattedItem);
                }
            });

            // Sort by order if needed, but array might be already sorted.
            return rootItems;
        }

        // For top and primary, return flat list as before
        return data.map((item) => ({
            id: item.id,
            href: item.path,
            label: item.title,
        }));

    } catch (error) {
        console.error(`Failed to fetch ${type} navigation:`, error);

        // Return appropriate fallback based on type
        if (type === 'top') {
            return [
                { id: 1, href: "#about", label: "About EmmesGroup" },
                { id: 2, href: "#resources", label: "Resources" },
                { id: 3, href: "#contact", label: "Contact" },
            ];
        } else if (type === 'footer') {
            // Basic fallback for footer
            return [
                { id: 13, href: "", label: "Company", items: [{ id: 14, href: "", label: "History" }, { id: 15, href: "", label: "Leadership" }] }
            ]
        }

        return [
            { id: 4, href: "#what-we-do", label: "What we do" },
            { id: 5, href: "#tech-ai", label: "Tech & AI" },
            { id: 6, href: "#cro-services", label: "CRO Services" },
            { id: 7, href: "#careers", label: "Careers" },
        ];
    }
};


export const useNavigation = (type: NavigationType = 'top') => {
    return useQuery({
        queryKey: ["navigation", type],
        queryFn: () => fetchNavigation(type),
        staleTime: 1000 * 60 * 60, // 1 hour
        retry: 1,
    });
};
