import { useRef, useEffect } from 'react';



/**
 * 3. Implement this function to transform the raw data
 * retrieved by the getMenuItems() function inside the database.js file
 * into the data structure a SectionList component expects as its "sections" prop.
 * @see https://reactnative.dev/docs/sectionlist as a reference
 */
export function getSectionListData(data) {
    // SECTION_LIST_MOCK_DATA is an example of the data structure you need to return from this function.
    // The title of each section should be the category.
    // The data property should contain an array of menu items. 
    // Each item has the following properties: "id", "title" and "price"
    const result = data.reduce((prev, curr) => {
        const parent = prev.find((p) => p?.title === curr?.category);
        if (parent) {
            if (!parent.data) {
                parent.data = [];
            }
            parent.data.push({
                id: curr.id,
                title: curr.title,
                price: curr.price,
            });
        } else {
            prev.push({
                category: curr?.category,
                data: [
                    {
                        id: curr.id,
                        title: curr.title,
                        price: curr.price,
                    }
                ],
            });
        }

        return prev;
    }, []);

    return result;
    // return SECTION_LIST_MOCK_DATA;
}

export function useUpdateEffect(effect, dependencies = []) {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            return effect();
        }
    }, dependencies);
}

// get unique category values 
const uniqueCategory = (data) => {
    const categoryData = menuItems.reduce((acc, menuItem) => {
        acc.add(menuItem.category);
        return acc;
    }, new Set());
    return categoryData
}