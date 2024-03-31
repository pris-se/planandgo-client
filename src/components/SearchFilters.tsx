import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button } from './ui/Button';
import { CustomSelect } from './ui/CustomSelect';
import { Input } from './ui/Input';

import { ReactComponent as SearchIcon } from "../assets/img/search.svg";


type FilterType = "input" | "select"

type FilterParams = {
    label: string;
    title: string;
    value: string;
    suggestions?: string[]
};

type SearchFiltersProps = {
    filtersProps: ActiveFilterState,
    filtersName: string
};
type ActiveFilterState = {
    input: FilterParams,
    select: FilterParams,
};


export const SearchFilters = ({ filtersProps, filtersName }: SearchFiltersProps) => {
    const navigate = useNavigate();
    const location = useLocation()
    const params = useSearchParams()
    const [filters, setFilters] = useState(filtersProps);
    const [activeFilters, setActiveFilters] = useState<ActiveFilterState>(filters);
    const [search, setSearch] = useState(filters.input?.value)


    const handleInputChange = (value: string, name: FilterType) => {
        setFilters((prev) => ({
            ...prev, [name]: {
                ...prev[name],
                value: value,
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFilters((prev) => ({
            ...prev, input: {
                ...prev.input,
                value: search,
            }
        }));
        setSearch("")
    };

    const hanldeResetFilters = () => {
        Object.keys(filters).forEach((key) => {
            updateFilters(key as FilterType, "")
        })
        navigate({ search: "" })
    }

    // function parseQueryParams(queryString: string) {
    //     const searchParams = new URLSearchParams(queryString);
    //     const filters: Record<string, any> = {};

    //     searchParams.forEach((value, key) => {
    //       filters[key] = { label: key, title: key.charAt(0).toUpperCase() + key.slice(1), value };
    //     });

    //     return filters;
    //   }

    useEffect(() => {
        const searchParams = new URLSearchParams();
        setActiveFilters(filters)
        Object.entries(filters).forEach(([key, value]) => {
            if (value.value) {
                searchParams.append(value.label, value.value);
            }
        });
        navigate(`?${searchParams.toString()}`);
    }, [filters])

    // useEffect(() => {
    //     const parsedSearchParams = parseQueryParams(location.search)
    //     setActiveFilters(parsedSearchParams)
    // }, [location])


    const updateFilters = (type: FilterType, value: string) => {
        const copy = filters
        copy[type].value = value
        setFilters(prev => ({ ...prev, ...copy }));
        setActiveFilters(copy)

    }
    const labels = useMemo(() => Object.entries(filters).filter(([key, value]) => value.value), [activeFilters])

    return (
        <>
            <div className='h-12'>
                {
                    labels.length ?
                        <div className='row-group gap--xs mb-2'>
                            {
                                labels.map(([key, value], idx) => {
                                    return (
                                        <div className='badge' key={idx}>
                                            {value.value}
                                            <Button
                                                onClick={() => {
                                                    updateFilters(key as FilterType, "")
                                                }}
                                                classes='btn btn--xs btn--square color-white'
                                            >
                                                &times;
                                            </Button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        <h3 className='mb-4 color-gray-30'>All {filtersName} </h3>

                }
            </div>

            <div className="row row--lg mb-3">
                {
                    filters.input ?
                        <div className="col-xl-3 col-lg-4 col-sm-6">
                            <div className="form-group">
                                <form className="search-form" onSubmit={handleSubmit}>
                                    <Input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        name='input'
                                        title={"Search" + " " + filters.input?.title + "..."}
                                        type="text"
                                        suggestions={filters.input?.suggestions}
                                    >
                                        <Button classes="btn btn--lg input-icon input-icon--right" type="submit">
                                            <span className='ico'>
                                                <SearchIcon />
                                            </span>
                                        </Button>
                                    </Input>
                                </form>
                            </div>
                        </div>
                        :
                        null
                }
                {
                    filters.select ?
                        <div className="col-xl-3 col-lg-4 col-sm-6">
                            <div className="form-group input--lg">
                                <CustomSelect
                                    selectValue={activeFilters.select.value}
                                    defaultValue={{ label: "All", value: "" }}
                                    options={filters.select.suggestions ? filters.select.suggestions.map((option) => ({ value: option, label: option })) : []}
                                    onSelect={(value) => handleInputChange(value? value?.value : "", "select")}
                                    placeholder={`Select ${filters.select.title}`}
                                />
                            </div>
                        </div>
                        : null
                }
                {
                    location.search ?
                        <div className='col-xl-3 col-lg-4 col-sm-6'>
                            <Button onClick={hanldeResetFilters} >Reset filters</Button>
                        </div>
                        :
                        null
                }
            </div >
        </>
    );
};

