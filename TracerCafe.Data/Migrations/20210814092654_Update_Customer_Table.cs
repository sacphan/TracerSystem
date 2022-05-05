using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TracerCafe.Data.Migrations
{
    public partial class Update_Customer_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ModifyDate",
                table: "Customers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "isDeleted",
                table: "Customers",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ModifyDate",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "isDeleted",
                table: "Customers");
        }
    }
}
