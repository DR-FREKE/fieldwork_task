"use client";

import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import React, { Fragment, ReactNode } from "react";

type TableSigleton = ReactNode;

type TableProps<T extends { [key: string]: TableSigleton }> = { data: T[] };

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary,
    color: theme.palette.info,
  },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const CustomRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AppTable<T extends { [key: string]: TableSigleton }>(
  props: TableProps<T>
) {
  return (
    <>
      {props.data?.length < 1 ? (
        <div className="flex justify-center items-center py-10 px-5">
          <span className="md:text-sm text-sm px-5 py-3 flex items-center leading-5 rounded-lg bg-gray-50 text-gray-500">
            There are currently no available data for this table
          </span>
        </div>
      ) : (
        <TableContainer component={Paper} style={{ boxShadow: "none" }}>
          <Table aria-label="custom table">
            <TableHead>
              <TableRow>
                <CustomTableCell>Check</CustomTableCell>
                {Object.keys(props.data[0])?.map((content, index) => (
                  <React.Fragment key={index}>
                    <CustomTableCell className="capitalize">
                      {content}
                    </CustomTableCell>
                  </React.Fragment>
                ))}
                <CustomTableCell>Icon</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data?.map((content, index) => (
                <CustomRow key={index}>
                  <CustomTableCell>
                    <Checkbox color="primary" />
                  </CustomTableCell>
                  {Object.keys(props.data[0])?.map((key_name, index) => (
                    <React.Fragment key={index}>
                      <CustomTableCell>{content[key_name]}</CustomTableCell>
                    </React.Fragment>
                  ))}

                  <CustomTableCell>
                    <Edit color="primary" />
                  </CustomTableCell>
                </CustomRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
