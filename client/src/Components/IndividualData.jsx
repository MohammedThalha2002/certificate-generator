import React from 'react'

export const IndividualData = ({individualExcelData}) => {
    return (
        <>
            <th>{individualExcelData.Id}</th>
            <th>{individualExcelData.Name}</th>
            <th>{individualExcelData.Course}</th>
            <th>{individualExcelData.Mentor1}</th>
            <th>{individualExcelData.Mentor2}</th>
        </>
    )
}