import React, { useEffect, useState, useCallback, useMemo } from 'react'
import debounce from "lodash.debounce";

import { StyleSheet, Text, View, Image, ScrollView, Pressable, KeyboardAvoidingView } from 'react-native';
import Header from '../Components/Header/Header';
import Hero from '../Components/Hero/Hero';
import FlatLists from '../Components/Lists/FlatLists';
import HomeFilter from '../Components/Filters/HomeFilter'
import { getSectionListData, useUpdateEffect } from '../utils/utils';
import { createTable, getMenuItems, saveMenuItems, filterByQueryAndCategories, deleteTable } from '../utils/database.js'
function Home() {
    const [menu, setMenu] = useState([])
    const [searchBarText, setSearchBarText] = useState("")
    const [sections, setSections] = useState([])
    const [query, setQuery] = useState("")
    const [filterSelections, setFilterSelections] = useState(
        sections.map(() => false)
    )
    const fetchData = async () => {
        // 1. Implement this function

        // Fetch the menu from the API_URL endpoint. You can visit the API_URL in your browser to inspect the data returned
        // The category field comes as an object with a property called "title". You just need to get the title value and set it under the key "category".
        // So the server response should be slighly transformed in this function (hint: map function) to flatten out each menu item in the array,

        const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
        const data = await response.json();
        return data.menu.map((item, index) => {
            return {
                id: index,
                title: item.name,
                price: item.price,
                category: item.category,
                description: item.description,
                image: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`
            };
        });
    };

    useEffect(() => {
        (async () => {


            try {
                // create a table called menuitems
                const databaseCreated = await createTable()

                let menuItems = await getMenuItems();

                if (!menuItems.length) {
                    data = await fetchData();

                    saveMenuItems(data)
                    // console.log(menuItems)
                    // console.log(data)
                    // set categories for filter buttons 
                    const categories = data.reduce((acc, item) => {
                        acc.add(item.category);
                        return acc;
                    }, new Set());
                    setSections([...categories])
                }
                setMenu(menuItems)
                const categories = menuItems.reduce((acc, item) => {
                    acc.add(item.category);
                    return acc;
                }, new Set());
                setSections([...categories])
            } catch (e) {
                console.log(e)
            }
        })()
    }, [])

    //this custom hook will not run on the first render
    useUpdateEffect(() => {
        (async () => {
            // Get active categories
            const activeCategories = sections.filter((s, i) => {
                // If all filters are deselected, all categories are active
                if (filterSelections.every((item) => item === false)) {
                    return true;
                }
                return filterSelections[i];
            });
            console.log(filterSelections)
            try {

                //get filtered menu items
                const menuItems = await filterByQueryAndCategories(
                    query,
                    activeCategories
                );
                // set menuitems based on the category selected and query searched 
                setMenu(menuItems)

            } catch (e) {
                console.log(e)
            }
        }
        )()

    }, [filterSelections, query])

    const lookup = useCallback((q) => {
        setQuery(q);
    }, []);

    const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

    // handle search 
    const handleSearchChange = (text) => {
        setSearchBarText(text);
        debouncedLookup(text);
    }
    //filter handler 
    //set the selected filters to true and the rest to false
    const handleFiltersChange = async (index) => {
        console.log(index)
        const arrayCopy = [...filterSelections];
        arrayCopy[index] = !filterSelections[index];
        setFilterSelections(arrayCopy)
    }
    console.log(searchBarText)
    return (
        <ScrollView>
            <Header showBackButton={false} />
            <Hero
                title="Little Lemon"
                subtitle="Chicago"
                content="We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist."
                onChangeText={handleSearchChange}
                value={searchBarText}
            />

            <HomeFilter
                selections={filterSelections}
                onChange={handleFiltersChange}
                sections={sections}
            />
            <FlatLists
                menuData={menu}
            />
        </ScrollView>
    )
}

export default Home