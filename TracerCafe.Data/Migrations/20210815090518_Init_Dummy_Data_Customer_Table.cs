using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.IO;

namespace TracerCafe.Data.Migrations
{
    public partial class Init_Dummy_Data_Customer_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sqlFile = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"Migrations/Scripts/Init_Dummy_Data_Customer_Table.sql");
            var script = File.ReadAllText(sqlFile);
            migrationBuilder.Sql(script);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
