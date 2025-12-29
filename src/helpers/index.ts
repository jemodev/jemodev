export const formatDate = (date: string): string => {
    const dateObj = new Date(date);

    return new Intl.DateTimeFormat("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(dateObj);

    // return dateObj.toLocaleDateString("es-ES", {
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    // });
}