import React, { useEffect, useState } from "react";
import "./list.scss";
import Card from "../card/Card";
import useFetch from "../../hooks/useFetch";

const List = ({ subCats, maxPrice, sort, catId }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const { data, loading:productLoading, error: productError } = useFetch(
        `/products?populate=*&[filters][categories][id]=${catId}${subCats.map(
            (item) => `&[filters][sub_categories][id][$eq]=${item}`
        )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
    );

    useEffect(() => {
        setLoading(productLoading);
        setProducts(data);
        setError(productError);
    }, [data, productError, productLoading]);

    return (
        <div className="list">           
            {
                loading ? (
                    "loading"
                ) : error ? (
                    "Something went wrong!!"
                ) : (
                    products?.map((item) => <Card item={item} key={item.id} />)
                )
            }
        </div>
    );
};

export default List;